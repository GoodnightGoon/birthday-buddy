window.addEventListener('load', function() {
  document.getElementById('checkButton').addEventListener('click', fetchData);

  function fetchData() {
    const userMonth = document.getElementById('userMonth').value.toLowerCase();
    const userDay = document.getElementById('userDay').value;

    if (userMonth === 'february' && userDay === '29') {
      fetchDataForDate('february', '28');
    } else {
      fetchDataForDate(userMonth, userDay);
    }
  }

  function fetchDataForDate(month, day) {
    const url = `https://api.nookipedia.com/villagers?api_key=697d79c0-3fec-4f74-818f-926aca08c0a1&birthmonth=${month}&birthday=${day}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const random = Math.floor(Math.random() * data.length);
          const villager = data[random];

          // Update the resultContainer with fetched data
          document.getElementById('resultContainer').classList.remove('hidden');
          document.querySelector('main').classList.add('hidden'); // Hide the main content

          document.querySelector('h2').innerHTML = 'Your Birthday Buddy is...';
          document.querySelector('h3').innerHTML = villager.name;
          document.querySelector('h4').innerHTML = `${villager.birthday_month}, ${villager.birthday_day}`;
          document.querySelector('.quote').innerHTML = `Quote: "${villager.quote}"`;
          document.querySelector('.phrase').innerHTML = `Phrase: "${villager.phrase}"`;
          document.querySelector('.species').innerHTML = `Species: ${villager.species}`;
          document.querySelector('.persona').innerHTML = `Personality: ${villager.personality}`;
          document.querySelector('.img').src = villager.image_url;


          document.getElementById('refreshButton').classList.remove('hidden');
          document.getElementById('refreshButton').addEventListener('click', function() {
            location.reload();
          });

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });


        } else {
          console.log('No data available for the specified month and day.');
        }
      })
      .catch(error => console.log('Error fetching data:', error));
  }
});
