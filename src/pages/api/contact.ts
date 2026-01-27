import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();

	const name = formData.get("name")?.toString() ?? "";
	const email = formData.get("email")?.toString() ?? "";
	const business = formData.get("business")?.toString() ?? "";
	const website = formData.get("website")?.toString() ?? "";
	const details = formData.get("details")?.toString() ?? "";
	const source = formData.get("source")?.toString() ?? "";
	const campaign = formData.get("campaign")?.toString() ?? "";

	// Basic server-side sanity check
	if (!name || !email || !details) {
		return new Response("Missing required fields.", { status: 400 });
	}

	// At this point you have all the form data on the server.
	// You can wire up email delivery using your preferred provider.
	//
	// Example (commented out) using Nodemailer + SMTP with .env variables:
	//
	// import nodemailer from "nodemailer";
	//
	// const transporter = nodemailer.createTransport({
	// 	host: process.env.SMTP_HOST,
	// 	port: Number(process.env.SMTP_PORT ?? 587),
	// 	secure: false,
	// 	auth: {
	// 		user: process.env.SMTP_USER,
	// 		pass: process.env.SMTP_PASS,
	// 	},
	// });
	//
	// await transporter.sendMail({
	// 	from: `"Website contact" <${process.env.SMTP_FROM}>`,
	// 	to: "contact@blakezajac.com",
	// 	subject: `New project enquiry from ${name}`,
	// 	text: [
	// 		`Name: ${name}`,
	// 		`Email: ${email}`,
	// 		`Business: ${business}`,
	// 		`Website: ${website}`,
	// 		`Source: ${source}`,
	// 		`Campaign: ${campaign}`,
	// 		"",
	// 		"Project details:",
	// 		details,
	// 	].join("\n"),
	// });
	//
	// Make sure to define the following in your .env (not committed):
	// - SMTP_HOST
	// - SMTP_PORT
	// - SMTP_USER
	// - SMTP_PASS
	// - SMTP_FROM

	// For now, just log the submission so nothing is silently lost.
	console.log("New contact submission", {
		name,
		email,
		business,
		website,
		details,
		source,
		campaign,
	});

	// Redirect back to the contact page with a simple status flag.
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/contact?status=sent",
		},
	});
}

