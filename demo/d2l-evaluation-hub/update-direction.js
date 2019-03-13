(function() {
	var isRtl = (window.location.search.indexOf('dir=rtl') > -1);

	if (isRtl && document.documentElement.dir !== 'rtl') {
		document.documentElement.dir = 'rtl';
	} else if (!isRtl && document.documentElement.dir === 'rtl') {
		document.documentElement.dir = '';
	}
})();
