require 'rubygems'
require 'bundler/setup'

# Require any additional compass plugins here.
require "ceaser-easing"
require "rgbapng"
require "breakpoint"
require "animation"

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "assets/css"
sass_dir = "assets/scss"
images_dir = "assets/images"
javascripts_dir = "assets/js"
fonts_dir = "assets/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = false

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass ../css/sass scss && rm -rf sass && mv scss sass

# Asset Cache Busting by appending hash to path rather than as query string
asset_cache_buster do |path, real_path|
  if File.exists?(real_path)
    pathname = Pathname.new(path)
    modified_time = File.mtime(real_path).strftime("%s")
    new_path = "%s/%s.%s%s" % [pathname.dirname, pathname.basename(pathname.extname), modified_time, pathname.extname]

    {:path => new_path, :query => nil}
  end
end
