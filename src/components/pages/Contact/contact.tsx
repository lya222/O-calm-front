import { useState } from 'react';
import './style.css';

const Contact = () => {
  // Etat
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    if (!name || !email || !message) {

      setError('Veuillez remplir tous les champs');

      return;

    }
    // a changer avec mon api 
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),

    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          setError(null);
        } else {
          setError(data.error);
        }
      })

      .catch((error) => {
        setError(error.message);
      });

  };


  return (
    <div className='Container'>


    <div className="contact-page">
    <h1>Contactez-nous</h1>




      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label htmlFor="name" className='name'></label>

          <input

            type="text"

            id="name"

            placeholder="Votre nom"

            value={name}

            onChange={(event) => setName(event.target.value)}

            required

          />

        </div>

        <div className="form-group">

          <label htmlFor="email" className='email'></label>

          <input

            type="email"

            id="email"
            
            placeholder="Votre email"

            value={email}

            onChange={(event) => setEmail(event.target.value)}

            required

          />

        </div>

        <div className="form-group">

          <label htmlFor="message" className='message'></label>

          <textarea

            id="message"

            placeholder="Votre message"

            value={message}

            onChange={(event) => setMessage(event.target.value)}

            required

          />

        </div>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">Merci de nous avoir contacté !</p>}

        <button type="submit">Envoyer</button>

      </form>

    </div>
    </div>

  );

};



export default Contact;
