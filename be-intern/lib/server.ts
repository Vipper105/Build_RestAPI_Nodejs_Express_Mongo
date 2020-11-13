import app from "./config/app";
import env from "./environment";
import * as cors from "cors";
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';


const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = env.getPort();

app.use(cors());

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));