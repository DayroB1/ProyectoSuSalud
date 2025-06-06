import { FormattedMessage } from 'react-intl'
import Button from './Navbar'

function Contacto() {

  return (
    <>
      {/* <Button></Button>
      <h1>SU SALUD</h1>
      <h4>Esta es la página que te dará información de contacto</h4>

    </>
  )
} */}
<Button />
      <h1>SU SALUD</h1>
      <h4><FormattedMessage id="contact.pageDescription" /></h4><br/><br/>
      <section style={{ margin: "24px 0" }}>
        <h2><FormattedMessage id="contact.section.title" /></h2>
        <p>
          <FormattedMessage id="contact.section.text" />
        </p>
        <ul>
          <li><strong><FormattedMessage id="contact.address.label" />:</strong> Av. Salud 123, Ciudad Bienestar, País</li>
          <li><strong><FormattedMessage id="contact.phone.label" />:</strong> +123 456 7890</li>
          <li><strong><FormattedMessage id="contact.email.label" />:</strong> contacto@susalud.com</li>
        </ul>
        <h3><FormattedMessage id="contact.hours.title" /></h3>
        <p><FormattedMessage id="contact.hours.weekday" /><br /><FormattedMessage id="contact.hours.saturday" /></p>
      </section>
    </>
  )
}

export default Contacto
