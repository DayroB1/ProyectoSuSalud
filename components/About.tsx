import Button from './Navbar'
import { FormattedMessage } from 'react-intl';

function About() {

  return (
    <>
    <Button />
      <h1>SU SALUD</h1>
      <h4><FormattedMessage id="about.pageDescription" /></h4><br/><br/>
      <section style={{ margin: "24px 0" }}>
        <h2><FormattedMessage id="about.whoAreWe.title" /></h2>
        <p>
         <FormattedMessage id="about.whoAreWe.text" />
        </p>
        <h2><FormattedMessage id="about.mission.title" /></h2>
        <p>
          <FormattedMessage id="about.mission.text" />
        </p>
        <h2><FormattedMessage id="about.values.title" /></h2>
        <ul>
          <li><FormattedMessage id="about.values.commitment" /></li> 
          <li><FormattedMessage id="about.values.ethics" /></li> 
          <li><FormattedMessage id="about.values.innovation" /></li>
          <li><FormattedMessage id="about.values.teamwork" /></li> 
        </ul>
      </section>
    </>
  )
}
      {/* <Button></Button>
      <h1>SU SALUD</h1>
      <h4>Esta es la página acerca de la institución</h4>

    </>
  )
}  */}

export default About
