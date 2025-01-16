const knexConnect = require('../knexConnection');

exports.subscriptionsave = async (customer_id, product_name, quantity, price_per_unit, product_id, frequency, start_date, end_date) => {

    let data = {
        customer_id,
        product_id,
        frequency,
        start_date,
        end_date,
        product_name,
        quantity,
        price_per_unit
    }

    try {
        await knexConnect('subs').insert(data);
        return true;
    } catch (error) {

        return false;

    }

}


exports.addformdata = async (typeofquestions,inputs) => {

    let data = {
        "form_type":JSON.stringify(typeofquestions),
        "form_inputs":JSON.stringify(inputs)
    }

    try {
        await knexConnect('formdata').insert(data);
        return true;
    } catch (error) {

        return false;

    }

}

exports.checksubscription = async (subscription_id) => {
    try {
        let data = await knexConnect('subs').select().where("subscription_id", subscription_id);

        if (data.length > 0) {
            return data;
        }
        else {
            return false;
        }

    } catch (error) {

        return false;

    }
}

exports.updatesubscription = async (subscription_id, data) => {
    try {
        await knexConnect('subs').update(data).where("subscription_id", subscription_id);
        return true;
    } catch (error) {

        return false;

    }
}
exports.deletesubscrip = async (subscription_id) => {
    try {
        await knexConnect('subs').delete().where("subscription_id", subscription_id);
        return true;
    } catch (error) {

        return false;

    }
}

exports.getcustomers = async (customer_id) => {

    try {
        let data = await knexConnect('subs').select().where("customer_id", customer_id);
        return data;
    } catch (error) {
        return false;
    }

}


exports.getformdata = async (formid) => {

    try {
        let data = await knexConnect('formdata').select().where("form_id", formid);
        if(data.length>0)
        {
            return data;
        }
        else{
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }

}

