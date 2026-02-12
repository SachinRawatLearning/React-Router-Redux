<!-- <html>

<head>

</head>

<body>
    <button onclick="getDataFromServer()"> Get Data </button>
    <div id="output"></div>
</body>

<script>

    // Browser - Main Thread
    function getDataFromServer() { 
        // window.open("http://localhost:9001/data", "_self");
        let xhr = new window.XMLHttpRequest(); // MT
        xhr.open ( "GET", "http://localhost:9001/data", true); // MT
        
        // to receive the response in MT
        xhr.onload = () => { 
            let json = xhr.responseText ; // MT
            document.getElementById("output").innerHTML = json ; 
            let a = JSON.parse ( json ); // JSON deserialization 
            console.log ( a ) ;
        };
        
        xhr.send(); // MT will intiate request but doesnt wait for response (ASYNC)
    } // MT will return to Event Loop
    
</script>
</html>

 -->
<!-- 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Three.js Balloon Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #87ceeb;
      font-family: Arial, sans-serif;
    }
    #score {
      position: absolute;
      top: 10px;
      left: 10px;
      color: #fff;
      font-size: 20px;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script>
  let scene, camera, renderer;
  let balloons = [];
  let fallingStrings = [];
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let score = 0;

  const GRAVITY = -0.0015;

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7);
    scene.add(light);

    for (let i = 0; i < 10; i++) {
      createBalloon();
    }

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("click", onClick);
  }

  function createBalloon() {
    const group = new THREE.Group();

    // Balloon
    const balloonGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const balloonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(Math.random(), Math.random(), Math.random())
    });
    const balloon = new THREE.Mesh(balloonGeo, balloonMat);
    balloon.position.y = 0.5;
    group.add(balloon);

    // String
    const stringGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
    const stringMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const string = new THREE.Mesh(stringGeo, stringMat);
    string.position.y = -0.75;
    string.userData.velocity = 0;
    group.add(string);

    group.position.x = (Math.random() - 0.5) * 10;
    group.position.y = -5 - Math.random() * 5;

    group.userData = {
      speed: 0.01 + Math.random() * 0.02,
      popping: false,
      popScale: 1
    };

    balloons.push(group);
    scene.add(group);
  }

  function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const balloonMeshes = balloons.map(b => b.children[0]);
    const intersects = raycaster.intersectObjects(balloonMeshes);

    if (intersects.length > 0) {
      const balloonMesh = intersects[0].object;
      const group = balloonMesh.parent;

      if (!group.userData.popping) {
        group.userData.popping = true;
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    balloons.forEach((group, index) => {
      const balloon = group.children[0];
      const string = group.children[1];

      if (group.userData.popping) {
        // Pop animation
        group.userData.popScale += 0.08;
        balloon.scale.setScalar(group.userData.popScale);

        if (group.userData.popScale > 1.4) {
          // Remove balloon
          group.remove(balloon);

          // Detach string
          string.position.add(group.position);
          scene.add(string);
          fallingStrings.push(string);

          scene.remove(group);
          balloons.splice(index, 1);

          score++;
          document.getElementById("score").textContent = "Score: " + score;
          createBalloon();
        }
      } else {
        // Normal floating
        group.position.y += group.userData.speed;
        if (group.position.y > 6) {
          group.position.y = -6;
        }
      }
    });

    fallingStrings.forEach((string, index) => {
      string.userData.velocity += GRAVITY;
      string.position.y += string.userData.velocity;
      string.rotation.z += 0.02;

      if (string.position.y < -7) {
        scene.remove(string);
        fallingStrings.splice(index, 1);
      }
    });

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
</script>


</body>
</html> -->



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Chessboard.js Game</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard.min.css"
    integrity="sha512-SfDPu0uSm2P3rV/7LgZxKxH8vNvKvxQMC6xDkJZ1j2HQbOALP5GHs7JrLfYVjZg/9+0bUb7Yb6P6VwhV6MHCXg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    body {
      margin: 20px;
      font-family: Arial;
    }

    #board {
      width: 480px;
    }

    #status {
      margin-top: 10px;
    }
  </style>
</head>

<body>

  <h2>Demos</h2>
  <div id="board"></div>
  <div id="status"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.13.4/chess.min.js"
    integrity="sha512-ZX3dREh/6hkq3WdLxXQqFQXlTQ8mE7I8cAHz+rKiQWcWRnsfQK0tMijhwk6jE9HR/RpBzdp2+17Gkhvpr0bX7Q=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/chessboard.min.js"
    integrity="sha512-lSvZg1s0SXtbqiy/guEjPMZAN3G/9od8r/0du/5VkoVgHf8v7s5tbKDR3TJZ5nOvyP9Mq8HDgXzYc1djhz4T4g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script>
    class A extends Object {
      constructor() {
        super();
        this.x = 100;
        this.users = null;
      }

      f1(/* this */ callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        // let that = this;
        // xhr.onload = function (/* this */) {
        //   that.users = xhr.responseText;
        //   callback();
        // };
         xhr.onload =  (/* this */) => {
          this.users = xhr.responseText;
          callback();
        };
        xhr.send();
      }
    }

    let a1 = new A();
    a1.f1( function() { 
      console.log(a1.users);
    });

  </script>
</body>

</html>