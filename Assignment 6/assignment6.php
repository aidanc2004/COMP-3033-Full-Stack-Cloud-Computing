<!-- Aidan Carey, COMP-3033 Assignment 6, March 5 2024 -->

<!DOCTYPE html>
<?php
    $connection = mysqli_connect("localhost", "videogame_user", "passw0rd", "video_games");

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $sql = "SELECT * FROM video_games.game ORDER BY global_sales DESC";
    $result = mysqli_query($connection, $sql);
?>
<html lang="en">
<html>
    <head>
        <title>Assignment 6</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <h1 class="pt-4 h2">Video Games:</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Game</th>
                        <th>Platform</th>
                        <th>Year</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        while($row = mysqli_fetch_array($result)) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['game_name'] . "</td>";
                            echo "<td>" . $row['platform_name'] .  "</td>";
                            echo "<td>" . $row['release_year'] .  "</td>";
                            echo "<td>" . $row['publisher_name'] . "</td>";
                            echo "</tr>";
                        }
                        mysqli_free_result($result);
                        mysqli_close($connection);
                    ?>
                </tbody>
            </table>
        </div>
    </body>
</html>