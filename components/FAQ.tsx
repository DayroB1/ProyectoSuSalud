import { FormattedMessage } from 'react-intl'
import Button from './Navbar'

function FAQ() {
  //throw new Error("Test error")
  return (
    <>
      {/* <Button></Button>
      <h1>SU SALUD</h1>
      <h4>Esta es la página que responde las FAQ</h4>

    </>
  )
} */}
<Button />
      <h1>SU SALUD</h1>
      <h4><FormattedMessage id="faq.pageDescription" /></h4><br/><br/>
      <section style={{ margin: "24px 0" }}>
        <h2><FormattedMessage id="faq.sectionTitle" /></h2>
        <div style={{ marginBottom: "16px" }}>
          <strong><FormattedMessage id="faq.q1.question" /></strong>
          <p><FormattedMessage id="faq.q1.answer" /></p>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <strong><FormattedMessage id="faq.q2.question" /></strong>
          <p><FormattedMessage id="faq.q2.answer" /></p>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <strong><FormattedMessage id="faq.q3.question" /></strong>
          <p><FormattedMessage id="faq.q3.answer" /></p>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <strong><FormattedMessage id="faq.q4.question" /></strong>
          <p><FormattedMessage id="faq.q4.answer" /></p>
        </div>
      </section>
    </>
  )
}
export default FAQ
