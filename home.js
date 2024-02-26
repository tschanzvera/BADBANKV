function Home(){
    return(
        <Card
        bgcolor="dark"
        txtcolor="white"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={(<img src="bank1.jpg" className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
    
}