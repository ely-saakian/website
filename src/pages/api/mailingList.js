// 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
//3e9018fb-652a-41e4-92ed-bfe7dd9b6068
import axios from "axios";

export default async function handler(req, res) {
	if (req.method === "PUT") {
		axios
			.put(
				"https://api.sendgrid.com/v3/marketing/contacts",
				{
					contacts: [{ email: `${req.body.email}` }],
					list_ids: ["3e9018fb-652a-41e4-92ed-bfe7dd9b6068"],
				},
				{
					headers: {
						"content-type": "application/json",
						Authorization: "Bearer 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",
					},
				}
			)
			.then((result) => {
				res.status(200).send({
					message: "Your email has been succesfully added to the mailing list. Welcome 👋",
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send({
					message: "Oups, there was a problem with your subscription, please try again or contact us",
				});
			});
	}
}
