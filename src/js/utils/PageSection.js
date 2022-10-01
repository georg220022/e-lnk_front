class PageSection { 
	constructor(id) {
  	this.id = document.getElementById(id);
  }

  render(component) {
    this.id.innerHTML = component;
  }
}

export default PageSection;