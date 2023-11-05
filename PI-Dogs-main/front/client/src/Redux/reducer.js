

const initialState = {
    counter: 1,
    dogs: [],
    usuario:[], 
    filterdogs:[],
    dogsCopia:[],
    temperaments:[],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {
          ...state,
          counter: state.counter + 1,
        };
      case 'DECREMENT':
        return {
          ...state,
          counter: state.counter - 1,
        };
      case "setCounter":
        return {
          ...state,
          counter: 0, 
        }
        case "ALL_DOGS":
          return{
            ...state,
            dogs: action.payload,
            dogsCopia: action.payload,
          }
        case "USER":
          return{
            ...state,
            usuario: action.payload,
          }
        case "GET_BY_NAME":
          return{
            ...state,
            dogs: action.payload,
          }
        case "ORDER_AZ":
          return {
            ...state,
            dogs: action.payload,
          };
        case "API":
          return{
            ...state,
            dogs: action.payload
          }
        case "DB":
          return{
            ...state,
            dogs: action.payload
          }
        case "ALL_TEMPERAMENTS":
          return{
            ...state,
            temperaments: action.payload
          }
        case "TRAER_TEMPERAMENT":
          return{
            ...state,
            dogs: action.payload
          }
        
        default:
        return state;
    }
  };
  
  export default rootReducer;
