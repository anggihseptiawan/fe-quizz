export const emptyQuestion = {
  question: "",
  answer0: "",
  answer1: "",
  answer2: "",
  answer3: "",
  correctAnswer: "",
}

export const questions = [
  {
    question: "What is JSX in React?",
    answer0: "A database query language",
    answer1: "A syntax extension for JavaScript",
    answer2: "A CSS framework",
    answer3: "A testing library",
    correctAnswer: "1",
  },
  {
    question: "Which of the following is a hook in React?",
    answer0: "useState",
    answer1: "useScript",
    answer2: "useStyles",
    answer3: "useServer",
    correctAnswer: "0",
  },
  {
    question: "How can you update the state of a component in React?",
    answer0: "this.state = {}",
    answer1: "this.setState()",
    answer2: "state.set()",
    answer3: "setState = {}",
    correctAnswer: "1",
  },
  {
    question: "What is the virtual DOM?",
    answer0: "A DOM manipulation library",
    answer1: "A real-time monitoring tool",
    answer2: "An in-memory representation of the DOM",
    answer3: "A new HTML5 specification",
    correctAnswer: "2",
  },
  {
    question:
      "Which method in a React component is called after the component is rendered for the first time?",
    answer0: "componentDidMount",
    answer1: "componentWillMount",
    answer2: "componentDidUpdate",
    answer3: "componentWillUnmount",
    correctAnswer: "0",
  },
  {
    question: "What is Redux primarily used for?",
    answer0: "Database management",
    answer1: "Data fetching",
    answer2: "State management",
    answer3: "Authentication",
    correctAnswer: "2",
  },
  {
    question: "Which of the following is not a lifecycle method in React?",
    answer0: "shouldComponentUpdate",
    answer1: "componentDidCatch",
    answer2: "componentFound",
    answer3: "getSnapshotBeforeUpdate",
    correctAnswer: "2",
  },
  {
    question: "What is a higher-order component in React?",
    answer0: "A component that takes a component as an argument",
    answer1: "A function that returns a new component",
    answer2: "Both A and B",
    answer3: "A class that inherits from another class",
    correctAnswer: "2",
  },
  {
    question:
      "Which of the following is a correct way to create a functional component?",
    answer0: "function MyComponent() { return <div />; }",
    answer1: "const MyComponent = function() { return <div />; }",
    answer2: "const MyComponent = () => <div />;",
    answer3: "All of the above",
    correctAnswer: "3",
  },
  {
    question:
      "How do you pass a prop from a parent component to a child component?",
    answer0: "<Child prop={value} />",
    answer1: "<Child>{value}</Child>",
    answer2: "<Child value={prop} />",
    answer3: "<Child>{prop: value}</Child>",
    correctAnswer: "0",
  },
]
