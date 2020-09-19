import React,{ useEffect, useState } from 'react';
import axios from 'axios';

function Header() {
   const [data, setData] = React.useState(null);
   const [trendingData, setTrendingData] = React.useState(null);
   const [sideNavData, setSideNavData] = React.useState(null);
   const [linkType, setType] = React.useState('Home');
   const [query, setQuery] = React.useState('');
   
   const getDataByCategory = async(type) => {
      const category = type	
	  const result = await axios.get(`https://newsapi.org/v2/top-headlines?q=${category}&apiKey=e4ece685b6934e9c93d42eff8638a302`)
	  setType(category)
	  setData(result.data);
   }

   const getDataByType = async(type) => {
	 const category = type
	 var url = `https://newsapi.org/v2/top-headlines?q=${category}&apiKey=e4ece685b6934e9c93d42eff8638a302`;
	 const result = await axios(url);
	 setSideNavData(result.data);
   } 
   
   const setSearchQuery = async()=>{
	   var url = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=e4ece685b6934e9c93d42eff8638a302`;
	   const result = await axios(url);
	   setTrendingData(result.data);
   }
   
   //First Time data load

	useEffect(async () => {
	const trendingResult = await axios.get('http://newsapi.org/v2/everything?' +'q=trending&' + 'apiKey=e4ece685b6934e9c93d42eff8638a302')
	setTrendingData(trendingResult.data);

	const result = await axios.get('https://newsapi.org/v2/top-headlines?q=all&apiKey=e4ece685b6934e9c93d42eff8638a302')
	setData(result.data);

	const resultData = await axios.get(`https://newsapi.org/v2/top-headlines?q=latest&apiKey=e4ece685b6934e9c93d42eff8638a302`)
	setSideNavData(resultData.data);
	}, []);

   return(
	<>   
    <header>
		<div className="top-head left">
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-lg-4">
						<h1>Triveous News<small>Get the latest News</small></h1>
					</div>
				</div>
			</div>
		</div>
	</header>
	<section className="top-nav">
			<nav className="navbar navbar-expand-lg py-0">
				<div className="container">
					<button className="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="exCollapsingNavbar2">
						<ul className="nav navbar-nav ">
							<li className="nav-item active"> <a className="nav-link" href="#">Home <span
										className="sr-only">(current)</span></a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('World')}> <a className="nav-link" href="#">World</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Politics')}> <a className="nav-link" href="#">Politics</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Business')}> <a className="nav-link" href="#">Business</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Science')}> <a className="nav-link" href="#">Science</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Sports')}> <a className="nav-link" href="#">Sports</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Technology')}> <a className="nav-link" href="#">Tech</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Travel')}> <a className="nav-link" href="#">Travel</a> </li>
							<li className="nav-item" onClick={()=>getDataByCategory('Health')}> <a className="nav-link" href="#">Health</a> </li>
						</ul>
						<form className="ml-auto">
							<div className="search">
								<input type="text" value={query} onChange={event => setQuery(event.target.value)} className="form-control" maxlength="64" placeholder="Search" />
								<button type="button" onClick={() =>setSearchQuery()} className="btn btn-search"><i className="fa fa-search"></i></button>
							</div>
						</form>
					</div>
				</div>
			</nav>
	</section>

	<section className="banner-sec"/>
		<div className="container">
			<div className="row flex-row flex-sm-nowrap pt-3" style={{display:'flex',overflowX: 'auto'}}>
				{trendingData && trendingData.totalResults>0 && trendingData.articles.map(val=>
					<div className="col-md-3">
						<div className="card"> 
						<a href={val.url}> 
							<img className="img-fluid"  src={val.urlToImage} alt=""/>
							<div className="card-img-overlay"> <span className="badge badge-pill badge-danger">Trending</span>
							</div>
							<div className="card-body">
								<div className="news-title">
								<h2 className=" title-small"><a href="#">{val.title}</a></h2>
								</div>
								<p className="card-text"><small class="text-time"><em>{val.publishedAt}</em></small></p>
							</div>
						</a>			 
						</div>
					</div>	
				)}
			</div>
		</div>
	<section />
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-md-12">
                    <h3 class="heading-large" style={{color:'black'}}>{linkType}</h3>
					<hr style={{border:'2px solid black'}}/>
					  {data && data.totalResults>0 && data.articles.map(val=>
					   <a href={val.url}> 
						<div class="col-lg-6 card " style={{border:'none'}}>
							<div class="card"> 
                            <img class="img-fluid" src={val.urlToImage} alt=""/>
								<div class="card-body">
									<div class="news-title"><a href="#">
					                    <h2 class=" title-small">{val.title}</h2>
										</a></div>
									<p class="card-text">{val.description}</p>
									<p class="card-text"><small class="text-time"><em>{val.publishedAt}</em></small></p>
								</div>
							</div>
						</div>
					  </a>		
					)}				

				<aside class="col-lg-4 side-bar col-md-12">
					<ul class="nav nav-tabs" style={{flexWrap:'nowrap'}} role="tablist" id="myTab">
						<li class="nav-item" onClick={()=>getDataByType('latest')}> <a class="nav-link active" data-toggle="tab" href="#home"
								role="tab">Latest</a> </li>
						<li class="nav-item" onClick={()=>getDataByType('top')}> <a class="nav-link" data-toggle="tab" href="#profile" role="tab">Top</a>
						</li>
						<li class="nav-item" onClick={()=>getDataByType('Featured')}> <a class="nav-link" data-toggle="tab" href="#messages"
								role="tab">Featured</a>
						</li>
					</ul>
                
					<div class="tab-content sidebar-tabing" id="nav-tabContent">
						<div class="tab-pane active" id="home" role="tabpanel">
						{sideNavData && sideNavData.totalResults > 0 && sideNavData.articles.map((val,i)=>{
							if(i < 3) {
								return(	
									<div class="media"> <a href={val.url}> <img class="d-flex mr-3"
										src={val.urlToImage}
										alt="Generic placeholder image"/></a>
										<div class="media-body">
											<div class="news-title">
											<h2 class="title-small"><a href="#">{val.title}</a></h2>
											</div>			
											<div class="news-auther"><span class="time">{val.publishedAt}</span></div>
										</div>
									</div>	
								)
							}
						}
						)}	
                        </div>
					</div>
                </aside>
			</div>
		</div>
        </div>
	</>	
   );
}
export default Header;