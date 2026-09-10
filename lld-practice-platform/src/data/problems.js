export const problems = [
  {
    id: "parking-lot", title: "Parking Lot", difficulty: "Medium",
    description: "Design a parking lot that manages multiple floors, vehicle types, parking spots, tickets and pricing.",
    requirements: ["Support multiple vehicle types", "Allocate suitable parking spots", "Generate tickets on entry", "Release spots on exit", "Calculate parking fees"],
    concepts: ["vehicle", "parking", "spot", "ticket", "fee"],
    evaluationCriteria: ["Responsibility separation", "Appropriate abstractions", "Relationships", "Extensibility"]
  },
  {
    id: "vending-machine", title: "Vending Machine", difficulty: "Easy",
    description: "Design a vending machine that manages products, inventory, payment and dispensing.",
    requirements: ["Manage products and inventory", "Accept payment", "Track machine state", "Dispense products", "Handle unavailable items"],
    concepts: ["product", "inventory", "payment", "state", "dispense"],
    evaluationCriteria: ["State modelling", "Responsibility separation", "Extensibility"]
  },
  {
    id: "elevator", title: "Elevator System", difficulty: "Hard",
    description: "Design an elevator system that receives floor requests and coordinates multiple elevators.",
    requirements: ["Support multiple elevators", "Accept internal and external requests", "Select an elevator", "Track direction and state", "Move between floors"],
    concepts: ["elevator", "request", "floor", "direction", "state"],
    evaluationCriteria: ["Abstractions", "Scheduling responsibility", "Extensibility"]
  },
  {
    id: "library", title: "Library Management", difficulty: "Medium",
    description: "Design a library system for books, members, borrowing, returns and fines.",
    requirements: ["Manage books and copies", "Register members", "Borrow and return books", "Track availability", "Calculate overdue fines"],
    concepts: ["book", "member", "borrow", "return", "fine"],
    evaluationCriteria: ["Entity boundaries", "Responsibility separation", "Extensibility"]
  }
];
