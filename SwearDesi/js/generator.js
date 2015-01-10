//Two lists to pick out the first and second parts of the wear word from
var list_one = ["Bhen","Bewakoof", "Chaval","Chutiya", "Madar", "Ullu ka Patha" ,"Randi", "Tatti", "Hijrah" , "Bondu","Saala" ,"Bund", "Kala","Gandu", "Gashti", "Harami", "Haramzada", "Khotay", "Kutay", "Lun", "Mumay", "Muth", "Puddi", "Padiashi", "teri Ma" ]
var list_two = ["Chod","ka Lora","Dalla", "Chaval","Ki Aulad" ,"Soor","Jaanvar" , "Tatti","Chutiya", "Bund", "Mara", "Gandu", "Gashti", "ka Bacha", "da Puttar", "Harami", "Haramzada", "Kanjar" , "Tatta",  "Khota", "Kuta", "Topa", "Lul", "Chuss" , "Puddi",  "Muth" ]

//This function gets called when the generate button is clicked
$('#generate_button').click(function() {
  	var a = list_one[Math.floor(Math.random() * list_one.length )];
  	var b = list_two[Math.floor(Math.random() * list_two.length )];

  	// 
  $('.text-updater__text').html(
  		'' + a + ' ' + b + ''
  	)
});