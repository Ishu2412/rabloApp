import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';
function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const email = user.email;
  const [productID, setProductID] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [featured, setFeatured] = useState(true);
  const [rating, setRating] = useState(0);
  const [createdAt, setCreatedAt] = useState();
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState();
  const [ready, setReady] = useState(false);

//   const handleSubmitProduct = async (event) => {
//     event.preventDefault();
//         fetch('https://rabloassessment.onrender.com/getProducts', {
//             method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(email),
//         })
//           .then(response => response.json())
//           .then(data => console.log(data));
//         console.log(product);
//   }

const handleSubmitProduct = async (event) => {
    event.preventDefault();
    fetch('https://rabloassessment.onrender.com/getProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }), // assuming user.email contains the email
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Assuming 'product' is a state variable
      setProduct(data);
      setReady(true); // Update the state variable 'product' with the fetched data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = { 
      email,
      productID,
      name, 
      price,
      featured,
      rating,
      createdAt,
      company,
    };

    fetch('https://rabloassessment.onrender.com/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        navigate('/home');
      });
    // after successful addition, navigate to home page
    navigate('/home');
  };
  return (
    <div>
    <nav className="bg-blue-500 p-2 mt-0 w-full">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <a className="text-white no-underline hover:text-white hover:no-underline" href="#">
            <span className="text-2xl pl-2"><i className="em em-grinning"></i>Home</span>
          </a>
        </div>
      </div>
    </nav>
    {/* <div className='text-2xl pl-2 text-white bg-blue-500 font-extrabold'>Products</div> */}
    <div className=''>
        <button className="group relative w-1/4 p-4 pt-3 m-3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit' onClick={handleSubmitProduct}>Get</button>
        
    </div>
    
    <div className='flex'>
    {ready && <div className='w-1/2 p-4 mt-3 text-white font-bold text-xl h-min'>
        <h2 className='bg-blue-500'>Products List</h2>
        <ul>
          {product.map((product, index) => (
            <li key={index} className='mt-2 pt-2 bg-blue-500'>
              <div>Product ID: {product.productID}</div>
              <div>Name: {product.name}</div>
              <div>Price: {product.price}</div>
              <div>Featured: {product.featured.toString()}</div>
              <div>Rating: {product.rating}</div>
              <div>Created At: {product.createdAt}</div>
              <div>Company: {product.company}</div>
              {/* Add other product details here */}
            </li>
          ))}
        </ul>
      </div>}
    <form className="mt-8 space-y-6 w-1/2" action="https://rabloassessment.onrender.com/add" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
        <div>Add Products:</div>
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email Address" value={user.email} />
          </div>
          <div>
            <label htmlFor="productID" className="sr-only">Email address</label>
            <input id="productID" name="productID" type="text" autoComplete="id" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="product id" onChange={(e) => setProductID(e.target.value)} />
          </div>
          <div>
            <label htmlFor="name" className="sr-only">Email address</label>
            <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="name" onChange={(e) => setName(e.target.value)}  />
          </div>
          <div>
            <label htmlFor="price" className="sr-only">Email address</label>
            <input id="price" name="price" type="number" autoComplete="price" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label htmlFor="featured" className="sr-only">Email address</label>
            <input id="featured" name="featured" type="boolean" autoComplete="featured" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={"true"} onChange={(e) => setFeatured(e.target.value)}  />
          </div>
          <div>
            <label htmlFor="rating" className="sr-only">Email address</label>
            <input id="rating" name="rating" type="number" autoComplete="rating" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="rating" onChange={(e) => setRating(e.target.value)} />
          </div>
          <div>
            <label htmlFor="createdAt" className="sr-only">Email address</label>
            <input id="createdAt" name="createdAt" type="date" autoComplete="createdAt" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" onChange={(e) => setCreatedAt(e.target.value)}  />
          </div>
          <div>
            <label htmlFor="company" className="sr-only">Email address</label>
            <input id="company" name="company" type="text" autoComplete="company" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Company" onChange={(e) => setCompany(e.target.value)} />
          </div>
        </div>

        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Home