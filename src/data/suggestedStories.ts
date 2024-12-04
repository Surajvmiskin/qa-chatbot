export interface SuggestedStory {
  story: string;
  questions: string[];
}

export const suggestedStories: SuggestedStory[] = [
  {
    story: "Mary moved to the bathroom. Sandra journeyed to the bedroom.",
    questions: ["Is Sandra in the hallway?"]
  },
  {
    story: "Mary moved to the bathroom. Sandra journeyed to the bedroom. Mary went back to the bedroom. Daniel went back to the hallway.",
    questions: ["Is Daniel in the bathroom?"]
  },
  {
    story: "Mary moved to the bathroom. Sandra journeyed to the bedroom. Mary went back to the bedroom. Daniel went back to the hallway. Sandra went to the kitchen. Daniel went back to the bathroom.",
    questions: ["Is Daniel in the office?"]
  },
  {
    story: "Mary moved to the bathroom. Sandra journeyed to the bedroom. Mary went back to the bedroom. Daniel went back to the hallway. Sandra went to the kitchen. Daniel went back to the bathroom. Daniel picked up the football there. Daniel went to the bedroom.",
    questions: ["Is Daniel in the bedroom?"]
  },
  {
    story: "Mary moved to the bathroom. Sandra journeyed to the bedroom. Mary went back to the bedroom. Daniel went back to the hallway. Sandra went to the kitchen. Daniel went back to the bathroom. Daniel picked up the football there. Daniel went to the bedroom. John travelled to the office. Sandra went to the garden.",
    questions: ["Is Daniel in the bedroom?"]
  },
  {
    story: "Sandra got the football there. Mary went to the bedroom.",
    questions: ["Is Mary in the bedroom?"]
  },
  {
    story: "Sandra got the football there. Mary went to the bedroom. Daniel got the apple there. Sandra travelled to the hallway.",
    questions: ["Is Sandra in the office?"]
  }
];