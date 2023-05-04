// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LeisvSAZjd1IZPPdwX5Eq4e5iPZuAiKVPFugdv9vfdpe1n30pZErXXu8f18Go8XQC1Rv9C78bt0dkEGyHd2FkNn00DZeFTSUH');
const planModel = require("../model/planModel")
const userModel = require("../model/userModel")

async function createSession(req, res){
    try{
        let userId = req.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId)
        const plan = await planModel.findById(planId)

        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_reference_id: plan.id,

        line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              name: plan.name,
              description: plan.description,
              amount: plan.price,
              currency: "inr",
              quantity: 1
            },
        ],
        success_url: `${req.protocol}://${req.get("host")}/user/login`,
        cancel_url: `${req.protocol}://${req.get("host")}/profile`
    })
    console.log(success_url);
        res.status(200).json({
            status:"success",
            session
        })
    }catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}


module.exports = {createSession}