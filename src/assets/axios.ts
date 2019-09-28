export default axios;

interface AxiosRequestConfig {
  url: string;
  method: string;
  data ?: any;
  params ?: any;
  callback ?: any;
}

function axios(config: AxiosRequestConfig): void {
  const { url, method = 'get', data = null, callback = null } = config;

  let xhr = new XMLHttpRequest();

  if (xhr == null) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.open(method.toUpperCase(), url, true);

  xhr.send(data);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200 && callback) {
      const result = JSON.parse(xhr.responseText);
      callback(result);
    }
  };

}
