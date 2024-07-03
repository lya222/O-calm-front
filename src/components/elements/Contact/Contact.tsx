import { ChangeEvent, useState } from "react";
import './contact.css'
function Contact () {

    //Etat
    const [name, setName] = useState('');
    const [email, setEmail] = useState ('');
    const [message, setMessage] = useState('');


    //Comportement 
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => { 
        event.preventDefault();
    }

    //Affichage 
    return (

        <div className="FormContainer">
            <h1>Contactez nous</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                id="name"
                placeholder="Nom"
                value={name}
                onChange={(event)=> setName(event.target.value)}
            
                />

                <input type="email"
                id="email"
                placeholder="Votre adresse mail"
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
            
                />
                <textarea 
                placeholder="Votre message"
                id="text"
                value={message}
                onChange={(event)=> setMessage(event.target.value)}
            
                />
                <button type="submit">Envoyer</button>
            </form>


        </div>
    )
}

export default Contact;