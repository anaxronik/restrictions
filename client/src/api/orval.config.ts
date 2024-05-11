const options = {
  api: {
    input: "http://localhost:8000/openapi.json",
    output: {
      target: "./api/api.ts",
      baseUrl: "http://localhost:8000/",
    },
  },
};

export default options;
