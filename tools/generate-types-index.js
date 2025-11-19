import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_TYPES_PATH = join(__dirname, "../src/libs/types/api.d.ts");
const OUTPUT_PATH = join(__dirname, "../src/libs/types/index.ts");

/**
 * Generate index.ts that exports all schema types from api.d.ts
 */
function generateTypesIndex() {
	try {
		const content = readFileSync(API_TYPES_PATH, "utf-8");

		// Extract schema names from components.schemas
		const schemaRegex = /components\["schemas"\]\["(\w+)"\]/g;
		const schemas = new Set();

		while (true) {
			const match = schemaRegex.exec(content);

			if (match === null) {
				break;
			}

			schemas.add(match[1]);
		}

		if (schemas.size === 0) {
			console.warn("No schema types found in api.d.ts");
			return;
		}

		// Generate export statements
		const exports = Array.from(schemas)
			.sort()
			.map(
				(schema) =>
					`export type ${schema} = components["schemas"]["${schema}"];`,
			)
			.join("\n");

		const output = `/**
 * Auto-generated type exports from api.d.ts
 * Do not edit manually - run 'pnpm generate:types' to regenerate
 */

import type { components } from "./api.d.ts";

${exports}
`;

		writeFileSync(OUTPUT_PATH, output, "utf-8");
		console.log(`✅ Generated ${schemas.size} type exports to ${OUTPUT_PATH}`);
	} catch (error) {
		console.error("Error generating types index:", error);
		process.exit(1);
	}
}

generateTypesIndex();
