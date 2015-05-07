<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Free Online service to Download YouTube videos at one click! The best YouTube Downloader supporting every Educational video in YouTube!">
	<link rel="shortcut icon" type="image/png" href="./images/favicon.png"/>
    <title>Download Youtube video--contact</title>
    <link href="_/css/bootstrap.css" rel="stylesheet">
	<link href="_/css/mystyles.css" rel="stylesheet">
  </head>
  <body id="contact">
	<section class="container">
	<div class="content row col col-lg-10 col-md-offset-1 well" style="background-color: #f1f1f1;">
	<?php include "_/components/php/header.php"; ?>
	<div class="row">	
     <!-- Alignment -->
	<div class="col-sm-offset-3 col-sm-6">
	   <!-- Form itself -->
          <form name="sentMessage" class="well" id="contactForm"  novalidate>
	       <legend>Contact me</legend>
		 <div class="control-group">
                    <div class="controls">
			<input type="text" class="form-control" 
			   	   placeholder="Full Name" id="name" required
			           data-validation-required-message="Please enter your name" />
			  <p class="help-block"></p>
		   </div>
	         </div> 	
                <div class="control-group">
                  <div class="controls">
			<input type="email" class="form-control" placeholder="Email" 
			   	            id="email" required
			   		   data-validation-required-message="Please enter your email" />
		</div>
	    </div> 	

               <div class="control-group">
                 <div class="controls">
				 <textarea rows="10" cols="100" class="form-control" 
                       placeholder="Message" id="message" required
		       data-validation-required-message="Please enter your message" minlength="5" 
                       data-validation-minlength-message="Min 5 characters" 
                        maxlength="999" style="resize:none"></textarea>
		</div>
               </div> 		 
	     <div id="success"> </div> <!-- For success/fail messages -->
	    <button type="submit" class="btn btn-primary pull-right">Send</button><br />
          </form>
	</div>
      </div>
	<?php include "_/components/php/footer.php"; ?>
	</div>
	</section>
	
    <script src="_/js/bootstrap.min.js"></script>
	<script src="_/js/jqBootstrapValidation.js"></script>
	<script src="_/js/contact.js"></script>
  </body>
</html>