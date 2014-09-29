package DDG::Spice::NinefoldStatus;
# ABSTRACT: Search for the current status of GitHub.

use DDG::Spice;

primary_example_queries "ninefold status";
description "Ninefold status";
name "Ninefold Status";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/NinefoldStatus.pm";
topics "computing", "programming";
category "programming";
attribution github => ['https://github.com/bradcater','Brad Cater'],
            twitter => ["https://twitter.com/bradcater", "bradcater"];

triggers startend => 'ninefold';

spice to => 'http://status.ninefold.com/history.atom';
spice proxy_cache_valid => "418 1d";


handle remainder => sub {
    return $_ if ($_ =~ m/^status$/i);
    return;
};

1;
