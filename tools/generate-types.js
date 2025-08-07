#!/usr/bin/env node

import { spawnSync } from "child_process";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables
dotenv.config();

const API_BASE_URL = process.env.PUBLIC_BASE_URL;
if (!API_BASE_URL) {
	console.error(
		"❌ Error: The environment variable PUBLIC_BASE_URL is not defined.",
	);
	process.exit(1);
}
const OUTPUT_DIR = "./types";

// OpenAPI endpoint for this project
const API_DOCS_ENDPOINT = "/api-docs";

async function getOpenApiSpec() {
	const url = `${API_BASE_URL}${API_DOCS_ENDPOINT}`;
	console.log(`🔍 Fetching OpenAPI specification from: ${url}`);

	try {
		// Validate URL before using it
		new URL(url);

		const result = spawnSync("curl", ["-s", url], { encoding: "utf8" });
		const response = result.stdout;

		// Check if request failed
		if (result.status !== 0) {
			throw new Error(`HTTP request failed with status: ${result.status}`);
		}

		// Skip if response is empty or contains HTML
		if (!response || response.trim().startsWith("<")) {
			throw new Error(
				"Invalid response: expected JSON but received HTML or empty response",
			);
		}

		const parsed = JSON.parse(response);

		// Check if it's a valid OpenAPI spec
		if (parsed.openapi || parsed.swagger) {
			console.log(
				`✅ Found OpenAPI spec (${parsed.openapi ? "OpenAPI" : "Swagger"} ${parsed.openapi || parsed.swagger})`,
			);
			return url;
		} else {
			throw new Error(
				"Invalid OpenAPI specification: missing openapi or swagger field",
			);
		}
	} catch (error) {
		console.error(
			`❌ Failed to fetch OpenAPI spec from ${url}:`,
			error.message,
		);
		throw new Error(
			`Could not load OpenAPI specification. Please ensure the API server is running and accessible at ${url}`,
		);
	}
}

async function generateTypes(specUrl) {
	console.log("🔧 Generating TypeScript types...");

	// Ensure output directory exists
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	try {
		// Validate specUrl
		try {
			new URL(specUrl); // Ensure specUrl is a valid URL
		} catch {
			throw new Error(`Invalid specUrl: ${specUrl}`);
		}

		// Generate types using openapi-typescript with safer argument passing
		spawnSync(
			"npx",
			["openapi-typescript", specUrl, "--output", `${OUTPUT_DIR}/api.ts`],
			{
				stdio: "inherit",
			},
		);

		console.log(`✅ Types generated successfully in ${OUTPUT_DIR}/api.ts`);

		// Parse the generated file to extract schema and path names
		const apiContent = fs.readFileSync(path.join(OUTPUT_DIR, "api.ts"), "utf8");
		const schemaNames = extractSchemaNames(apiContent);
		const pathNames = extractPathNames(apiContent);

		// Create index file for easier imports with individual exports
		const indexContent = generateIndexContent(schemaNames, pathNames);
		fs.writeFileSync(path.join(OUTPUT_DIR, "index.ts"), indexContent);
		console.log(
			`✅ Created ${OUTPUT_DIR}/index.ts with ${schemaNames.length} schema types and ${pathNames.length} path types`,
		);
	} catch (error) {
		console.error("❌ Failed to generate types:", error.message);
		throw error;
	}
}

function extractSchemaNames(apiContent) {
	console.log("🔍 Extracting schema names...");

	const schemaNames = new Set(); // Use Set to automatically handle duplicates

	try {
		// Method 1: Parse components.schemas section more accurately
		const componentsMatch = apiContent.match(
			/components:\s*\{[\s\S]*?schemas:\s*\{([\s\S]*?)\};?[\s\S]*?\}/m,
		);

		if (componentsMatch) {
			console.log("📋 Using components.schemas section for type extraction");
			const schemasSection = componentsMatch[1];

			// More comprehensive regex to catch all schema names including ones with underscores, numbers, etc.
			const schemaRegex = /^\s+([A-Za-z_][A-Za-z0-9_-]*):\s*\{/gm;
			let match;

			while ((match = schemaRegex.exec(schemasSection)) !== null) {
				const schemaName = match[1];
				schemaNames.add(schemaName);
			}
		}

		// Method 2: Global search for all possible schema definitions with comprehensive patterns
		const globalPatterns = [
			// Standard naming patterns
			/^\s+([A-Za-z][A-Za-z0-9]*(?:Api)?(?:Request|Response|Dto|Void|Error|Info|Status|Config|Data|Result)):\s*\{/gm,
			// ApiResponse* patterns
			/^\s+(ApiResponse[A-Za-z0-9]*):\s*\{/gm,
			// Any camelCase/PascalCase types
			/^\s+([A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)*):\s*\{/gm,
		];

		globalPatterns.forEach((pattern, index) => {
			let match;
			pattern.lastIndex = 0; // Reset regex state
			while ((match = pattern.exec(apiContent)) !== null) {
				const schemaName = match[1];
				// Filter out common false positives
				if (
					!schemaName.match(
						/^(export|import|interface|type|const|let|var|function)$/i,
					)
				) {
					schemaNames.add(schemaName);
				}
			}
		});

		// Method 3: Specific search for known missing types
		const knownTypes = ["ApiResponseVoid", "ApiResponse"];
		knownTypes.forEach((typeName) => {
			const typeRegex = new RegExp(
				`^\\s+(${typeName}[A-Za-z0-9]*):\\s*\\{`,
				"gm",
			);
			let match;
			while ((match = typeRegex.exec(apiContent)) !== null) {
				schemaNames.add(match[1]);
			}
		});
	} catch (error) {
		console.warn(
			"⚠️  Warning: Could not parse schema names, using basic fallback",
		);

		// Ultra-basic fallback: just look for any TypeScript interface/type definition
		const basicRegex =
			/^\s+([A-Z][a-zA-Z0-9]*(?:Request|Response|Api|Dto|Void)):\s*\{/gm;
		let match;
		while ((match = basicRegex.exec(apiContent)) !== null) {
			schemaNames.add(match[1]);
		}
	}

	// Convert Set back to sorted array
	const schemaArray = Array.from(schemaNames).sort();

	console.log(`✅ Found ${schemaArray.length} schemas:`);
	console.log(
		`   ${schemaArray.slice(0, 5).join(", ")}${schemaArray.length > 5 ? `... and ${schemaArray.length - 5} more` : ""}`,
	);

	// Validate that common types are included
	const commonTypes = ["ApiResponseVoid"];
	const missingTypes = commonTypes.filter(
		(type) => !schemaArray.includes(type),
	);
	if (missingTypes.length > 0) {
		console.warn(
			`⚠️  Warning: Expected types not found: ${missingTypes.join(", ")}`,
		);
		console.warn(
			"   Consider checking if these types exist in the OpenAPI spec or update the extraction patterns",
		);
	} else {
		console.log(`✅ All expected common types found`);
	}

	return schemaArray;
}

function extractPathNames(apiContent) {
	console.log("🔍 Extracting path names...");

	const pathNames = [];
	const pathRegex = /^\s+"([^"]+)":\s*\{/gm;
	let match;

	while ((match = pathRegex.exec(apiContent)) !== null) {
		const pathName = match[1];
		if (pathName.startsWith("/") && !pathNames.includes(pathName)) {
			pathNames.push(pathName);
		}
	}

	console.log(`Found paths: ${pathNames.join(", ")}`);
	return pathNames;
}

function generateIndexContent(schemaNames, pathNames) {
	const schemaExports = schemaNames
		.map((name) => `export type ${name} = components['schemas']['${name}'];`)
		.join("\n");

	// Create path type exports with sanitized names
	const pathExports = pathNames
		.map((path) => {
			const sanitizedName =
				path
					.replace(/^\/api\/v1\//, "") // Remove /api/v1/ prefix
					.replace(/\//g, "_") // Replace / with _
					.replace(/[{}]/g, "") // Remove curly braces
					.replace(/-/g, "_") // Replace hyphens with underscores
					.split("_")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join("") + "Path";

			return `export type ${sanitizedName} = paths['${path}'];`;
		})
		.join("\n");

	return `export * from './api';
export type { paths, components } from './api';

// Individual schema exports for easier importing
import type { components, paths } from './api';

${schemaExports}

// Individual path exports for easier importing
${pathExports}
`;
}

async function main() {
	try {
		const specUrl = await getOpenApiSpec();
		await generateTypes(specUrl);

		console.log("\n🎉 API types generation completed!");
		console.log(`\nYou can now import types directly:`);
		console.log(`import type { CreateQuestionSetApiRequest } from './types';`);
		console.log(`\nOr use the traditional way:`);
		console.log(`import type { components } from './types';`);
		console.log(`type ApiResponse = components['schemas']['YourDtoName'];`);
	} catch (error) {
		console.error("\n❌ Error:", error.message);
		process.exit(1);
	}
}

if (import.meta.url === `file://${process.argv[1]}`) {
	main();
}
