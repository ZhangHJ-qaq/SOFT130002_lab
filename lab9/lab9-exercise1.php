<html>
<head>
    <title>Exercise 1</title>
</head>
<body>
<h1>Regular HTML section (outside &lt;?php ... ?&gt; tags)</h1>
<p>You can type regular HTML here and it will show up</p>

<h1>PHP section (inside &lt;?php ... ?&gt; tags)</h1>
<?php
//this is a php comment IN tags (will not appear)

//exercise1_2
echo "<div style='color: red'>exercise1_2</div>";
echo "This page was generated: " . date("M dS, Y");
echo "<br>";

//exercise1_4
echo "<div style='color: red'>exercise1_4</div>";
echo "This page was generated: " . date("M dS, Y") . "<hr/>";

//exercise1_8
$date = date("M dS, Y");
echo "<div style='color: red'>exercise1_8</div>";
echo "This page was generated: " . $date . "<hr/>";

//exercise1_9
echo "<div style='color: red'>exercise1_9</div>";
$d = date("l , F dS , Y H:i:s");
echo "This page was generated " . $d;
echo "</br>";

//exercise1_11
echo "<div style='color: red'>exercise1_11</div>";
$isLeapYear = date("L");
if ($isLeapYear) {
    $remainingDays = 366 - date("z");
} else {
    $isLeapYear = 365 - date("z");
}

echo "There are " . $remainingDays . " days in this year!!"
?>
</body>
</html>