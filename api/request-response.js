import axios from 'axios';
import nm from 'node_mailer';

const sendMail = async (req,res)=>{
    try{
        const transporter = nm.createTransport({
            service: 'gmail',
            auth: {
                user: 'sdfgx243@gmail.com', // change this email to owner's mail
                pass:  process.env.APP_PASSWORD_MAIL
            }
        })

        await transporter.sendmail({
            from: req.body.email,
            to: process.env.CONTACT_US_EMAIL,
            subject: 'Response request for issue'+req.body.issueId,
            text:`${req.body.email} has requested a response for issue ${req.body.issueId}`,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Response Requested Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: Inter, Arial, sans-serif;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f7f7f7;">
        <tr>
            <td align="center" style="padding: 20px 0;">

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e0e0e0;">

                    <tr>
                        <td style="background-color: #CC0000; padding: 25px 30px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0; line-height: 1.2;">
                                🚨 Urgent Response Requested 🚨
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                            <p style="margin: 0 0 20px 0;">
                                <b>${req.body.email}</b> has submitted a <b>Response Request</b> for an issue <b>#${req.body.issueId}</b>, 
                                This issue requires <b>immediate attention</b> from the support team.
                            </p>
                            <p style="margin: 0;">
                                Please access the ticket details via the button below and provide a response promptly.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 30px 15px 30px;">
                            <h2 style="font-size: 20px; color: #CC0000; margin: 0; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Issue Reference</h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table border="0" cellpadding="10" cellspacing="0" width="100%" style="font-size: 15px; border-collapse: collapse;">
                                <tr>
                                    <td width="30%" style="background-color: #f9f9f9; padding: 12px 15px; border-radius: 4px 0 0 4px; font-weight: bold; color: #555555;">Issue ID</td>
                                    <td width="70%" style="background-color: #ffffff; padding: 12px 15px; border-left: 1px solid #e0e0e0; border-radius: 0 4px 4px 0; color: #CC0000; font-weight: bold;">${req.body.issueId}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 0 30px 40px 30px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" bgcolor="#CC0000" style="border-radius: 6px;">
                                        <a href="https://admin.anmoleducationalbooks.com/issues/"${req.body.issueId} target="_blank" style="font-size: 16px; font-family: Inter, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 12px 25px; border: 1px solid #CC0000; display: inline-block; font-weight: bold;">
                                            VIEW ISSUE TICKET
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td style="background-color: #e9ecef; padding: 20px 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; text-align: center; color: #6c757d; font-size: 12px;">
                            This is an automated notification about a response request. Please action the issue immediately.
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
                    </html>`
        })

        res.status(201).json({
            success: true,
            message: 'SUCCESS'
        })

    }catch(e){
        res.status(500).json({
            success: false,
            message: 'INTERNAL_SERVER_ERROR'
        })
    }
}

export default async (req,res)=>{


        
        if (req.method === "POST") {
              
            axios.get(
                "https://api.anmoleducationalbooks.com/issues/request-response/" +
                req.body.issueId
            ).then(res=>{

                if(res.data.success){
                    sendMail(req,res);
                }

            }).catch(e=>{
                console.log(e);
                res.status(500).json({
                    success: false,
                    message: 'INTERNAL_SERVER_ERROR'
                })
            })
    
        } else {
            res.header("Allow", "POST");
            res.status(405).end("Method not allowed");
        }
  
}