import {useState} from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface PostData {
  name: string;
  email: string;
  message: string;

}

function Contact () {
    //Etat 
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();


    // Comportement

     // Fonction pour poster les données

     const postData = async (postData: PostData) => {
      const response = await axios.post(
        `${url}/contact`,
        postData
      );
      console.log(response.data, '+', response.status);
      return response;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !email || !message) {

            setError('Veuillez remplir tous les champs');
      
            return;
      
    }

    const donnéesÀEnvoyer = { name, email, message };

      const response = await postData(donnéesÀEnvoyer);
      console.log(response.status);

      if (response.status>=200) {

        setSuccess(true);

        setError(null);

        //Replace pour ne pas revenir en arrière

        setTimeout(()=> {
          navigate('/', { replace: true}); 
        }, 2000);

      } else {

        setError(response.statusText);

      }


  };

    //Affichage 

    return (
        <div className="Container">

            <div className="contact-page">

            <h1>Contactez-nous</h1>

            <form onSubmit={handleSubmit}>

            <div className="form-group"> 

            <label htmlFor="name" className='name'></label>

            <input type="text" name="name" id="name" placeholder="Votre nom" value={name} onChange={(event) => setName(event.target.value)} aria-label="Nom requis" required/>
           
           </div>

            <div className="form-group"> 

            <label htmlFor="email" className='email'></label>

            <input type="email" name="email" id="email" placeholder="Votre email" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email requis" required />

            </div>

            <div className="form-group"> 

            <label htmlFor="message" className='message'></label>

            <textarea id="message" placeholder="Votre message" value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Message requis" required/>
            
            </div>

            {error && <p className="error">{error}</p>}

            {success && <div><p className="success"> Merci de nous avoir contacté !</p></div>}

            <button type="submit">

            <img width="100" height="100" src="https://img.icons8.com/bubbles/100/button2.png" alt="button2"/> 
 

            </button>

            </form>

            </div>
            

        </div>
    )
};

export default Contact;