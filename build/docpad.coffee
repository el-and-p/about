# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

	# Change the port DocPad uses from the default 9778 to 8081
	port: 9778

	# Out Path
	# Where should we put our generated website files?
	# If it is a relative path, it will have the resolved `rootPath` prepended to it
	outPath: "../www"

	# Src Path
	# Where can we find our source website files?
	# If it is a relative path, it will have the resolved `rootPath` prepended to it
	srcPath: "../src"

	# Ignore Common Patterns
    # Whether or not we should ignore commonly undesired files from the scanning process
    # E.g. .DStore, thumbs.db, .git, files that start with a tilda, etc.
	ignoreCommonPatterns: true  # default
    # Ignore Custom Patterns

    # Can be set to a regex of custom patterns to ignore from the scanning process
	ignoreCustomPatterns: /(~$)|(.ignore$)|(.sw(o|p))/

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "http://el-and-p.github.io/about"

			# Here are some old site urls that you would like to redirect from
			oldUrls: [ ]

			# The default title of our website
			title: "EL & P"

			# The website description (for SEO)
			description: """
			EL & P | Site built by Ellen Pickett, Lydia Bae & Pat O'Callaghan
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
			Auckland Sea Shuttles, Ellen Pickett, Pat O'Callaghan, Lydia Bae, Web development, web design, HTML, CSS, JavaScript
				"""

			# The website author's name
			author: "EL&P (Pat O'Callaghan, Lydia Bae and Ellen Picket)"

			# The website author's email
			email: "patocallaghan@gmail.com"



		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				@document.title
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')


	# =================================
	# Collections
	# These are special collections that our website makes available to us

	# collections:
		# objects: ->
           # @getCollection("partials").findAllLive({isObject:true})

	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()

	# =================================
	# DocPad Plugins
	plugins:
		marked:
			markedOptions:
				# Turn off sanitisation so we can embed HTML inside our markdown files
				sanitize: false

		sass:
		   # sassPath: 'c:/Ruby193/bin/sass.bat'
		   # scssPath: 'c:/Ruby193/bin/scss.bat'
		   compass: 'compass/config.rb'
		   bundler: true
}


# Export our DocPad Configuration
module.exports = docpadConfig
