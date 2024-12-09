import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "*", // O reemplaza '*' con tu dominio específico para más seguridad
});

const data = {
  status: 200,
  data: { name: "John Doe", age: 30 },
};

const allUser = {};

export default function handler(req, res) {
  // console.log("req", req.headers.token);
  if (req.method == "GET") {
    if (req.headers.token == "123") {
    }
    allUser[Object.values(allUser).length + 1] = {
      id: Object.values(allUser).length + 1,
    };

    res.status(200).json({
      id: Object.values(allUser).length + 1,
      allUser,
    });
  }
  if (req.method == "POST") {
    req.body;
    res.status(200).json({
      ...data,
      newData: req.body,
    });
  }
}
