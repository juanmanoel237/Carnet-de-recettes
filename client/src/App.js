import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login';
import RecipeList from './pages/RecipeList/RecipeList';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/recipes' element={<RecipeList/>} />
          <Route path='/recipes/:id' element={<RecipeDetail/>} />
          <Route path='/create-recipe' element={<CreateRecipe/>} />
          <Route path='/edit-recipe' element={<EditRecipe/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
