import React from 'react'
import { Input } from './ui/input'
// import { Label } from './ui/label'
import { Button } from './ui/button'

const FilterSidebar = ({search, setSearch, category, setCategory, brand, setBrand, setPriceRange, allProducts, priceRange}) => {

  const categories = allProducts.map(p => p.category)  // get all categories 
  const UniqueCategory = ["All",...new Set(categories)]  // get unique category of the same item 

  const Brands = allProducts?.map(p=>p.brand)
  const UniqueBrand = ["All",...new Set(Brands)] // get unique brands name of the same brands name 

  const handleCategoryClick = (val) => {
    setCategory(val)
  }

  const handleBrandChange =(e) =>{
    setBrand(e.target.value)
  }

  const handleMinChange = (e) =>{
    const value = Number(e.target.value);
    if(value <= priceRange[1]) setPriceRange([value, priceRange[1]])
  }

  const handleMaxChange = (e) =>{
    const value = Number(e.target.value);
    if(value >= priceRange[0]) setPriceRange([priceRange[0], value])
  }

  const resetFilters = ()=>{
    setSearch("");
    setCategory("All")
    setBrand("All");
    setPriceRange([0,999999]);
  }

  // console.log(UniqueCategory );
  // console.log(UniqueBrand)

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64' >
      {/* Search */}
     
      <Input 
      type="text" 
      placeholder="Search..." 
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="bg-white p-2 rounded-md border-gray-400 border-2 w-full "/>
      
      {/* Category */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
     <div className= "flex flex-col gap-2 mt-3">
        {
            UniqueCategory.map((item,index)=>{
              return <div key={index} className='flex items-center gap-2' >
                <input type="radio" 
                 checked={category == item}
                 onChange={() =>handleCategoryClick(item)}
                />
                <label htmlFor="" >{item}</label>
              </div>

            })
        }
     </div>

     {/* Brands */}
      <h1 className='mt-5 font-semibold text-xl'>Brand</h1>
       <select className='bg-white w-full p-2 border-gray-200 border-2 rounded-md' value={brand} onChange={handleBrandChange}>
        {
          UniqueBrand.map((item,index) => {
            return <option key={index} value={item} >{item.toUpperCase()}</option>
          })
        } </select>

        {/* priceRange */}
        <h1 className='mt-5 font-semibold text-xl mb-3' >Price Range</h1>
        <div className='flex flex-col gap-2'>
            <label>
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <div className='flex gap-2 items-center'>
              <input type="number" min="0" max="5000"  
              value={priceRange[0]}
              onChange={handleMinChange}
              className='w-20 p-1 border border-gray-300 rounded'
              />
              <span>-</span>
              <input type="number" min="0" max="999999" value={priceRange[1]}
              onChange={handleMaxChange} className='w-20 p-1 border border-gray-300 rounded' />
            </div>
            <input type="range" min="0" max="5000"  step="100" value={priceRange[0]}
              onChange={handleMinChange} className='w-full' />
              <input type="range" min="0" max="999999" step="100" 
              value={priceRange[1]}
              onChange={handleMaxChange} className='w-full' />
        </div>
          {/* reset button */}
          <Button onClick={resetFilters} className="bg-linear-to-br from-[#2A6BE6] via-[#1E85C7] to-[#0EA5B4] text-white mt-5 cursor-pointer w-full "  >Reset Filters</Button>
  
    </div>
  )
}

export default FilterSidebar
