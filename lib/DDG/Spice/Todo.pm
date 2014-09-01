package DDG::Spice::Todo;

use DDG::Spice;

name "todo";
description "Manage a simple to-do list";
source "todo";
primary_example_queries "todo show";
secondary_example_queries "todo add buy milk";
category "special";
topics "everyday", "special_interest";
code_url "https://github.com/bradcater/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Todo.pm";
attribution github => ["https://github.com/bradcater", "Brad Cater"],
            twitter => ["https://twitter.com/bradcater", "bradcater"];

triggers start => "todo";

spice to => 'http://betterific.com/api/search/all?q=$1&page=1&per_page=1';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
  # If the query isn't blank, then use it for the API query.
  return $_ if length($_) > 0;

	return '' if $_ eq '';
	return;
};

1;
