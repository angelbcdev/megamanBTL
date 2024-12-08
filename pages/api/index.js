const data = {
  status: 200,
  data: { name: "John Doe", age: 30 },
};

export default function handler(req, res) {
  res.status(200).json(data);
}
