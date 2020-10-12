import * as axios from 'axios';

const policeGrammApi = axios.create({
    crossdomain: true,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'x98736zu.beget.tech',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0',
    },
    baseURL: 'http://x98736zu.beget.tech/',
});


export const policeGramm = {
    getMarkers(position) {
        let latitude = position.latitude;
        let longitude = position.longitude;
        return policeGrammApi.get('getMarkers.php?latitude='+latitude+'&longitude='+longitude);
    },
    createMarker(marker) {
        let data = new FormData();
        data.append('latitude', marker.latitude);
        data.append('longitude', marker.longitude);
        data.append('title', marker.title);
        data.append('description', marker.description);
        data.append('image', marker.image);
        return policeGrammApi.post('createMarker.php', data);
    },
    getContacts() {
        return policeGrammApi.get('getContacts.php');
    },
    createReport(markerId, description) {
        let data = new FormData();
        data.append('markerId', markerId);
        data.append('description', description);
        return policeGrammApi.post('createReport.php', data);
    },
    confirmMarker(markerId) {
        let data = new FormData();
        data.append('markerId', markerId);
        return policeGrammApi.post('confirmMarker.php', data);
    },
    getSponsors() {
        return policeGrammApi.get('getSponsors.php');
    }
    /*
    login(loginData) {
        return samuraiApi.post('/auth/login', loginData);
    },
    logout() {
        return samuraiApi.delete('/auth/login');
    },
    getCaptcha() {
        return samuraiApi.get(`security/get-captcha-url`);
    }
    */
}