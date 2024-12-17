import React, { useEffect, useState } from 'react'
import './App.css'
import './style.css'
import Panel from './components/Panel'
import getFeatureState from './feature'

function App() {
  const [showProductCatalog, setShowProductCatalog] = useState(false);
  const [enable_product_management, setEnableProductManagement] = useState(false);

  useEffect(() => {
    const fetchShowProductCatalog = async () => {
      const isEnabled = await getFeatureState('show_product_catalog', false);
      setShowProductCatalog(isEnabled);
    };

    fetchShowProductCatalog();
    fetchShowProductCatalog();
    fetchShowProductCatalog(); 

    const timeoudId = setTimeout(() => {
      getFeatureState('enable_product_management', false).then((isEnabled) => {
        setEnableProductManagement(isEnabled);
      })
    }, 300)
    return () => clearTimeout(timeoudId);
  }, []);
  
  return (
    <>
    <main className='main'>
    <Panel title='Feature Flagging'>
        Feature flagging is a software development practice that allows developers to toggle features on and off at runtime.
      </Panel>
      {showProductCatalog && <Panel title='Product Catalog'>
        A product catalog is a database of products that are available for purchase in an online store.
        A product catalog is a database of products that are available for purchase in an online store.
        A product catalog is a database of products that are available for purchase in an online store.
        A product catalog is a database of products that are available for purchase in an online store.
      </Panel>}
      {enable_product_management && <Panel title='Product Management'>
        Product management is an organizational function that guides every step of a product's lifecycle: from development to positioning and pricing, by focusing on the product and its customers first and foremost.
      </Panel>}
    </main>
    </>
  )
}

export default App
