import React, { Component } from 'react';


export default class RecipeDetail extends Component {


  //First Way
  // constructor (props) {
  //     super(props)

  //     this.state = {
  //         recipe:recipe,
  //         url:`https://www.food2fork.com/api/get?key=3f1d40996d23dc88f110b264b29fc73e&rId=${this.props.id}
  //         `
  //     }
  // }
  
  // async componentDidMount() {
  //   try {
  //         const data = await fetch(this.state.url);
  //         const jsonData = await data.json();
      
  //         this.setState({
  //           recipe: jsonData.recipe
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  // }

  // Second Way

  state = {
    recipe: {f2f_url: "",
    image_url:"",
    ingredients: [],
    publisher: "",
    publisher_url: "",
    source_url:
      ""}
  }

  async componentDidMount() {
    const id = this.props.id;
    const url = `https://www.food2fork.com/api/get?key=3f1d40996d23dc88f110b264b29fc73e&rId=${id}`;
    try {
              const data = await fetch(url);
              const jsonData = await data.json();
          
              this.setState({
                recipe: jsonData.recipe
              });
            } catch (error) {
              console.log(error);
            }
  }

  render() {

    const{image_url, 
      publisher, 
      publisher_url, 
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    const {handleIndex} = this.props;
    
    return (
        <React.Fragment>
           <div className='container'>
              <div className='row'>
              {/* First column */}
                <div className='col-10 mx-auto col-md-6 my-3'>
                  <button type='button' 
                          onClick={() => handleIndex(1)}
                          className='btn btn-warning mb-5 text-capitalize'>
                    back to recipe
                  </button>
                  <img src={image_url} className='d-block w-100' alt='recipe'/>
                </div>
                {/* Second column for Details */}
                <div className='col-10 mx-auto col-md-6 my-3'>
                  <h6 className='text-uppercase'>{title}</h6>
                  <h6 className='text-warning text-capitalize text-slanted'>provided by {publisher}</h6>
                  <a href={publisher_url}
                    target='_blank'
                    className='btn btn-primary mt-2 text-capitalize'
                    rel="noopener noreferrer">
                    publisher webpage</a>
                  <a href={source_url}
                    target='_blank'
                    className='btn btn-success mx-3 mt-2 text-capitalize'
                    rel="noopener noreferrer">
                    recipe url</a>
                  <ul className='list-group mt-4'>
                    <h2 className='mt-3 mb-4'>Ingredients</h2>
                    {ingredients.map((item, index) => {
                      return (
                        <li key={index} className='list-group-item text-slanted'>{item}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
           </div>
        </React.Fragment>
    )
  }
}
