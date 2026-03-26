import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Subject = {
    name : Text;
    icon : Text;
    description : Text;
  };

  type Chapter = {
    subjectName : Text;
    chapterNumber : Nat;
    title : Text;
  };

  type QuestionType = {
    #short;
    #long;
    #mcq;
  };

  type Answer = {
    question : Text;
    answer : Text;
    questionType : QuestionType;
    marks : Nat;
  };

  module Answer {
    public func compare(a : Answer, b : Answer) : Order.Order {
      Text.compare(a.question, b.question);
    };
  };

  let subjects : [Subject] = [
    {
      name = "Physics";
      icon = "⚛️";
      description = "Study of matter, energy, and the laws of nature.";
    },
    {
      name = "Chemistry";
      icon = "🧪";
      description = "Study of substances, elements, and chemical reactions.";
    },
    {
      name = "Biology";
      icon = "🌱";
      description = "Study of living organisms and life processes.";
    },
    {
      name = "Mathematics";
      icon = "➗";
      description = "Study of numbers, shapes, and mathematical operations.";
    },
    {
      name = "English";
      icon = "📚";
      description = "Study of language, literature, and communication skills.";
    },
    {
      name = "Urdu";
      icon = "📖";
      description = "Study of Urdu language and literature.";
    },
  ];

  let chapters : [Chapter] = [
    // Physics
    {
      subjectName = "Physics";
      chapterNumber = 1;
      title = "Physical Quantities and Measurement";
    },
    {
      subjectName = "Physics";
      chapterNumber = 2;
      title = "Kinematics";
    },
    {
      subjectName = "Physics";
      chapterNumber = 3;
      title = "Dynamics";
    },
    {
      subjectName = "Physics";
      chapterNumber = 4;
      title = "Work and Energy";
    },
    // Chemistry
    {
      subjectName = "Chemistry";
      chapterNumber = 1;
      title = "Fundamentals of Chemistry";
    },
    {
      subjectName = "Chemistry";
      chapterNumber = 2;
      title = "Atomic Structure";
    },
    {
      subjectName = "Chemistry";
      chapterNumber = 3;
      title = "Chemical Bonding";
    },
    {
      subjectName = "Chemistry";
      chapterNumber = 4;
      title = "States of Matter";
    },
    // Biology
    {
      subjectName = "Biology";
      chapterNumber = 1;
      title = "Introduction to Biology";
    },
    {
      subjectName = "Biology";
      chapterNumber = 2;
      title = "Cell Biology";
    },
    {
      subjectName = "Biology";
      chapterNumber = 3;
      title = "Biological Molecules";
    },
    {
      subjectName = "Biology";
      chapterNumber = 4;
      title = "Enzymes";
    },
    // Mathematics
    {
      subjectName = "Mathematics";
      chapterNumber = 1;
      title = "Number Systems";
    },
    {
      subjectName = "Mathematics";
      chapterNumber = 2;
      title = "Algebraic Expressions";
    },
    {
      subjectName = "Mathematics";
      chapterNumber = 3;
      title = "Linear Equations";
    },
    {
      subjectName = "Mathematics";
      chapterNumber = 4;
      title = "Geometry Basics";
    },
    // English
    {
      subjectName = "English";
      chapterNumber = 1;
      title = "Comprehension Passages";
    },
    {
      subjectName = "English";
      chapterNumber = 2;
      title = "Essay Writing";
    },
    {
      subjectName = "English";
      chapterNumber = 3;
      title = "Grammar";
    },
    {
      subjectName = "English";
      chapterNumber = 4;
      title = "Poetry Appreciation";
    },
    // Urdu
    {
      subjectName = "Urdu";
      chapterNumber = 1;
      title = "Nazam";
    },
    {
      subjectName = "Urdu";
      chapterNumber = 2;
      title = "Ghazal";
    },
    {
      subjectName = "Urdu";
      chapterNumber = 3;
      title = "Mazmoon";
    },
    {
      subjectName = "Urdu";
      chapterNumber = 4;
      title = "Kahani";
    },
  ];

  let answers : [Answer] = [
    // Physics Chapter 1
    {
      question = "Define physical quantity with examples.";
      answer = "A physical quantity is a property of an object or phenomenon that can be measured. Examples include length, mass, time, and temperature.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "What is velocity?";
      answer = "Velocity is the rate of change of displacement. It is a vector quantity with both magnitude and direction.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Differentiate between speed and velocity.";
      answer = "Speed is the rate of change of distance covered, while velocity is the rate of change of displacement. Speed is a scalar quantity, whereas velocity is a vector quantity.";
      questionType = #long;
      marks = 5;
    },
    {
      question = "Define acceleration.";
      answer = "Acceleration is the rate of change of velocity per unit time. It is a vector quantity.";
      questionType = #short;
      marks = 2;
    },
    // Physics Chapter 2
    {
      question = "State Newton's Second Law of Motion.";
      answer = "Newton's Second Law states that the force acting on a body is directly proportional to the mass and acceleration of the body (F = ma).";
      questionType = #short;
      marks = 2;
    },
    {
      question = "What is inertia?";
      answer = "Inertia is the property of an object to resist changes in its state of motion. It depends on the mass of the object.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Define work.";
      answer = "Work is the product of force and distance moved in the direction of force. It is measured in Joules.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Explain the law of conservation of energy.";
      answer = "Law of conservation of energy states that energy cannot be created or destroyed, it can only be transformed from one form to another. The total energy remains constant.";
      questionType = #long;
      marks = 5;
    },
    // Chemistry Chapter 1
    {
      question = "Define matter.";
      answer = "Matter is anything that has mass and occupies space. It exists in three states: solid, liquid, and gas.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "What is an atom?";
      answer = "An atom is the smallest unit of an element that retains the properties of that element.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Explain atomic structure.";
      answer = "Atomic structure refers to the arrangement of protons, neutrons, and electrons within an atom. Protons and neutrons are located in the nucleus, while electrons orbit around the nucleus.";
      questionType = #long;
      marks = 5;
    },
    {
      question = "Define chemical bonding.";
      answer = "Chemical bonding is the force that holds atoms together in molecules or compounds. It includes ionic, covalent, and metallic bonds.";
      questionType = #short;
      marks = 2;
    },
    // Biology Chapter 1
    {
      question = "What is biology?";
      answer = "Biology is the scientific study of living organisms and their interactions with the environment.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Define cell biology.";
      answer = "Cell biology is the study of structure, function, and processes of cells, which are the basic units of life.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Explain biological molecules.";
      answer = "Biological molecules are the building blocks of living organisms, including carbohydrates, proteins, lipids, and nucleic acids.";
      questionType = #long;
      marks = 5;
    },
    {
      question = "What are enzymes?";
      answer = "Enzymes are biological catalysts that speed up chemical reactions in living organisms.";
      questionType = #short;
      marks = 2;
    },
    // Mathematics Chapter 1
    {
      question = "Define natural numbers.";
      answer = "Natural numbers are counting numbers starting from 1 (1, 2, 3, ...).";
      questionType = #short;
      marks = 2;
    },
    {
      question = "What are whole numbers?";
      answer = "Whole numbers include all natural numbers and zero (0, 1, 2, 3, ...).";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Explain algebraic expressions.";
      answer = "Algebraic expressions are mathematical phrases containing variables, constants, and operations (+, –, ×, ÷).";
      questionType = #long;
      marks = 5;
    },
    {
      question = "Define linear equation.";
      answer = "A linear equation is an equation of the first degree, representing a straight line when graphed. It has the form ax + b = 0.";
      questionType = #short;
      marks = 2;
    },
    // English Chapter 1
    {
      question = "What is comprehension?";
      answer = "Comprehension means understanding the meaning of a given passage or text.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Define essay writing.";
      answer = "Essay writing is the process of expressing thoughts, ideas, or opinions on a particular topic in a structured format.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Explain grammar.";
      answer = "Grammar refers to the set of rules that govern the structure and use of language, including sentence formation, punctuation, and parts of speech.";
      questionType = #long;
      marks = 5;
    },
    {
      question = "What is poetry appreciation?";
      answer = "Poetry appreciation involves analyzing and understanding the meaning, style, and emotions conveyed in a poem.";
      questionType = #short;
      marks = 2;
    },
    // Urdu Chapter 1
    {
      question = "What is Nazam?";
      answer = "Nazam is a genre of Urdu poetry written in a specific rhythmic form. It usually conveys a moral lesson.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Define Ghazal.";
      answer = "Ghazal is a poetic form consisting of rhyming couplets and a refrain, expressing feelings of love or loss.";
      questionType = #short;
      marks = 2;
    },
    {
      question = "Explain Mazmoon writing.";
      answer = "Mazmoon writing refers to the composition of essays in Urdu, discussing different social, moral, or educational topics.";
      questionType = #long;
      marks = 5;
    },
    {
      question = "What is Kahani?";
      answer = "Kahani means a short story in Urdu literature, often teaching a lesson or moral value.";
      questionType = #short;
      marks = 2;
    },
  ];

  public query ({ caller }) func getSubjects() : async [Subject] {
    subjects;
  };

  public query ({ caller }) func getChaptersBySubject(subjectName : Text) : async [Chapter] {
    chapters.filter(func(chapter) { chapter.subjectName == subjectName });
  };

  public query ({ caller }) func getAnswersByChapter(subjectName : Text, chapterNumber : Nat) : async [Answer] {
    answers;
  };

  public query ({ caller }) func searchAnswers(keyword : Text) : async [Answer] {
    answers;
  };
};
