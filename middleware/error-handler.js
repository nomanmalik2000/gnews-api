require("dotenv").config();

const errorHandler = async (
    err,
    req,
    res,
    next
) => {
    if (err.message.includes("Validation: ")) {
        err.message = err.message.replace("Validation: ", "");
        err.message = JSON.parse(err.message)
    }

    return res.status(500).send({
        error: err.message,
        status_code: 500,
        message: "Something Went Wrong..!",
        data: null,
    });
};

module.exports = {errorHandler}