module.exports = function(Contact) {
  Contact.afterRemote('create', function(context, modelInstance, next) {
    console.log(modelInstance);

    Contact.app.models.Email.send({
      to: 'jeremy.adoux@gmail.com',
      from: 'mariage@zarazetti.com',
      subject: "Nouveau mail de contact de votre site de mariage",
      text: 'Adresse mail de l\'expéditeur : '+modelInstance.email+'. Mail envoyé par : '+modelInstance.name+'. Contenu du mail : '+modelInstance.content,
      html: 'Adresse mail de l\'expéditeur :<br /> '+modelInstance.email+'<br />Mail envoyé par : <br />'+modelInstance.name+'. <br />Contenu du mail : <br />'+modelInstance.content
    }, function(err, mail) {
    });

    next();
  });
};
