import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, message } = await req.json()
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Fehlende Felder' }, { status: 400 })
  }
  try {
    await resend.emails.send({
      from: 'Ze-Solution <noreply@ze-solution.com>',
      to: 'ze.solution@email.com',
      subject: `Neue Anfrage von ${name}`,
      html: `<h2>Neue Kontaktanfrage</h2><p><strong>Name:</strong> ${name}</p><p><strong>E-Mail:</strong> ${email}</p><p><strong>Nachricht:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    })
    await resend.emails.send({
      from: 'Ze-Solution <noreply@ze-solution.com>',
      to: email,
      subject: 'Deine Anfrage ist angekommen!',
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#2d7a3a;">Vielen Dank, ${name}!</h2><p>Deine Nachricht ist bei uns eingegangen. Wir melden uns so schnell wie möglich bei dir.</p><br/><p>Herzliche Grüße,<br/><strong>Ze-Solution</strong></p></div>`,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Fehler beim Senden' }, { status: 500 })
  }
}
