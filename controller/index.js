const moment = require('moment');
const { compareDates } = require('../helper');
const { subscriptionsave, checksubscription, updatesubscription, deletesubscrip, getcustomers } = require('../model');

const currentDateServer = moment().format('YYYY-MM-DD');

exports.subscription = async (req, res) => {
    let data = req.body;


    if (!data?.customer_id || !data?.product_id) {
        return res.send({
            status: false,
            message: "Please provide customer id and product id"
        })
    }

    if (data?.frequency != "daily" && data?.frequency != "weekly") {
        return res.send({
            status: false,
            message: "Please provide frequency as daily or weekly."
        })
    }

    let quantity = data?.quantity ? parseInt(data.quantity, 10) : null;

    if (quantity === null || isNaN(quantity)) {
        return res.send({
            status: false,
            message: "Please provide quantity"
        });
    }

    if (quantity <= 0) {
        return res.send({
            status: false,
            message: "Please provide quantity greater then 0"
        })
    }

    if (!data.start_date) {
        return res.send({
            status: false,
            message: "Please provide a start date"
        })
    }

    if (!data.end_date) {
        return res.send({
            status: false,
            message: "Please provide a end date"
        })
    }

    let resp = compareDates(data.start_date, currentDateServer)

    if (resp != "after") {
        return res.send({
            status: false,
            message: "Please provide date starting from tommorow"
        })
    }

    let resp1 = compareDates(data.end_date, data.start_date)

    if (resp1 != "after") {
        return res.send({
            status: false,
            message: "Start date must be before end date"
        })
    }

    let product_name = data?.product_name || "Product Name Dummy"
    let price_per_unit = parseInt(data?.price_per_unit, 10) || 100

    try {
        let insert_data = await subscriptionsave(data.customer_id, product_name, quantity, price_per_unit, data.product_id, data.frequency, data.start_date, data.end_date);

        if (insert_data) {
            return res.send({
                status: true,
                message: "Subscription created successfully"
            })
        }
        else {
            return res.send({
                status: false,
                message: "Subscription not created"
            })
        }

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }

}


exports.subscriptionupdate = async (req, res) => {

    let { subscription_id } = req.params;

    subscription_id = parseInt(subscription_id, 10) || null
    let data = req.body;

    if (!subscription_id) {
        return res.send({
            status: false,
            message: "Please provide a valid subscription id"
        })
    }

    let checksubsid = await checksubscription(subscription_id)

    if (!checksubsid) {
        return res.send({
            status: false,
            message: "No such subscription id found"
        })
    }

    let end_date = checksubsid[0].end_date;

    let resp = compareDates(end_date, currentDateServer)

    if (resp != "after") {
        return res.send({
            status: false,
            message: "Expired subscription"
        })
    }

    if (data?.frequency != "daily" && data?.frequency != "weekly") {
        return res.send({
            status: false,
            message: "Please provide frequency as daily or weekly."
        })
    }

    let quantity = data?.quantity ? parseInt(data.quantity, 10) : null;

    if (quantity === null || isNaN(quantity)) {
        return res.send({
            status: false,
            message: "Please provide quantity"
        });
    }

    if (quantity <= 0) {
        return res.send({
            status: false,
            message: "Please provide quantity greater then 0"
        })
    }

    try {

        let finaldata = {
            "quantity": quantity,
            "frequency": data.frequency
        }

        let update_data = await updatesubscription(subscription_id, finaldata);

        if (update_data) {
            return res.send({
                status: true,
                message: "Subscription updated successfully"
            })
        }
        else {
            return res.send({
                status: false,
                message: "Subscription not updated"
            })
        }

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }

}


exports.deletesubscription = async (req, res) => {

    let { subscription_id } = req.params;

    subscription_id = parseInt(subscription_id, 10) || null
    let data = req.body;

    if (!subscription_id) {
        return res.send({
            status: false,
            message: "Please provide a valid subscription id"
        })
    }

    let checksubsid = await checksubscription(subscription_id)

    if (!checksubsid) {
        return res.send({
            status: false,
            message: "No such subscription id found"
        })
    }

    let end_date = checksubsid[0].end_date;

    let resp = compareDates(end_date, currentDateServer)

    if (resp != "after") {
        return res.send({
            status: false,
            message: "Expired subscription"
        })
    }

    try {

        let deletesub = await deletesubscrip(subscription_id);

        if (deletesub) {
            return res.send({
                status: true,
                message: "Subscription deleted successfully."
            })
        }
        else {
            return res.send({
                status: false,
                message: "Subscription not deleted."
            })
        }

    } catch (error) {

        return res.send({
            status: false,
            message: error.message
        })

    }

}

exports.getsubscription = async (req, res) => {
    let { customer_id } = req.params;

    customer_id = parseInt(customer_id, 10) || null

    if (!customer_id) {
        return res.send({
            status: false,
            message: "Please provide a valid customer id"
        })
    }

    try {
        let data = await getcustomers(customer_id);

        if (!data) {
            return res.send({
                status: false,
                message: "Something went wrong"
            })
        }
        else {
            return res.send({
                status: true,
                data: { "customer_id": customer_id, "data": data },
                message:"Customer List"
            })
        }

    } catch (error) {
        return res.send({
            status: false,
            message:error.message
        })
    }

}