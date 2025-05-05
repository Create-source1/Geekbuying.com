 
        //   <div class="allProductBoxOuter">
        //   <!-- for outer border and space  -->
        //   <div class="allProdcutBoxInner">
        //     <!-- inner box contain the main product info  -->
        //     <!-- flex or grid with single col view here  -->
        //     <div id="innerProductImage">
        //       <img src="" alt="" id="productImage" />
        //     </div>

        //     <span id="productNameInBox"> </span>

        //     <span id="priceInfo">
        //       <!-- will auto update manually based on nav application -->
        //       <span id="currencySign"></span>
        //       <span id="currencyAmount"></span>
        //     </span>

        //     <!-- it will update only in the case of diff between actual and offer price is zero  -->
        //     <span id="actualPriceInfo">
        //       <span id="actualPriceInBox"></span>
        //       <span id="discountInfoInBox"></span>
        //     </span>

        //     <div id="footerBox">
        //       <span id="likeProduct">
        //         <img src="" alt="" id="likeUpdate" />
        //         <span id="countNo"></span>
        //       </span>

        //       <span id="freeShiping">
        //         <!-- only if true  -->
        //       </span>
        //     </div>
        //   </div>
        // </div>

        let {useState} = React;

        function ProductCards(){
                let [products, setProduct] = useState([])
                let[count, setCount] = useState(0)

                if(products === null){
                        axios.get('https://geekbuying-8e592-default-rtdb.asia-southeast1.firebasedatabase.app/productData.json')
                        .then(response =>{
                                let responseArray = Object.entries(response.data).map(([id, data])=> ({id, ...data, likes:0}))
                                setProduct(responseArray)
                                // console.log(responseArray)
                        })
                        .catch(error=>{
                                console.log('Error:', error.message)
                        })        
                }

                function handleClick(id){
                        setCount(prev => prev + 1)
                }
                return(
                        <>
                        <div className='product-card'>
                        <h2>Product List</h2>
                        <div className='product-list'>
                        {products ? (
                                products.map(product=>(
                                        <div key={product.id}>
                                        <h3>Name: {product.name}</h3> 
                                        <image src={product.image} alt={product.name}/>
                                        <p>Price: {product.price}</p>
                                        <button onClick={()=> handleClick(product.id)}>Like ❤️</button>
                                        </div>     
                         ))
                        )  : (<p>Loding Products...</p>) }
                        
                        </div>
                        </div>
                        </>
                )
        }

        function App(){
                return(
                        <>
                        <ProductCards/>
                        </>
                )
        }
        ReactDOM.createRoot(document.getElementById('root')).render(<App/>)