const downloadZip = (zip: string | undefined) => {
	let elem = window.document.createElement('a');
	elem.href = 'data:application/zip;base64,' + zip;
	elem.download = 'cloudFormation.zip';
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
};

export default downloadZip;