
require("dotenv").config();
const app = require("./app")


const app_port = process.env.PORT || 4000;
app.listen(app_port, () => {
    console.log(`Server is listening on port http://localhost:${app_port}`);
})