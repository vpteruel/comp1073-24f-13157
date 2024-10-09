function showCounterHit() {
    const counterId = document.getElementById("counter-id").value;

    document.getElementById("counter-loading").style.display = "none";

    if (counterId === "") return;

    document.getElementById("counter-loading").style.display = "block";

    fetch(
        `https://api.api-ninjas.com/v1/counter?id=${counterId}&hit=true`, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'fqpORERjLXuHXRsIVfojbg==4n4pPoAxdb4VyIj6'
        }
    }
    )
        .then(response => {
            if (!response.ok)
                throw new Error('network response error');
            return response.json();
        })
        .then(data => {
            document.getElementById("counter-hit").value = data.value;
            document.getElementById("counter-loading").style.display = "none";
        })
        .catch(err => {
            console.error(err);
        });
}