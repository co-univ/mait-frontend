import type { MultipleChoiceApiResponse } from '@/libs/types';
import type { SolvingAnswerProps } from './SolvingAnswer';
import SolvingAnswer from './SolvingAnswer';

//
//
//

interface SolvingAnswerMultipleProps extends SolvingAnswerProps {
  choice: MultipleChoiceApiResponse
  onChoiceClick: (choiceNumber: number) => void;
}

//
//
//

const SolvingAnswerMultiple = ({ choice, onChoiceClick, ...props }: SolvingAnswerMultipleProps) => {
  return (
    <button type="button" onClick={() => onChoiceClick(choice.number)}>
      <SolvingAnswer {...props} readOnly content={`${choice.number}. ${choice.content}`} />
    </button>
  );
};

export default SolvingAnswerMultiple;