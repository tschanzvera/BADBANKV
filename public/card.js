const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;


function Card(props){
    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
         return 'card w-75 mb-3 ' + bg + txt ;
      }
    return(
      
      
        <div className={classes()} style={{maxWidth: "50%", minHeight: "80vh" , margin: "auto", margintop: "20"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h2 className="card-title">{props.title}</h2>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }