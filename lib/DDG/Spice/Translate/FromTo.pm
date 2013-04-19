package DDG::Spice::Translate::FromTo;

use DDG::Spice;
use Moo;

with('DDG::SpiceRole::Translate');

attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

my $langs = 'arabic|ar|chinese|zh|czech|cz|english|en|french|fr|greek|gr|italian|it|japanese|ja|korean|ko|polish|pl|portuguese|pt|romanian|ro|spanish|es|turkish|tr';

spice to   => 'http://api.wordreference.com/0.8/{{ENV{DDG_SPICE_WORDREFERENCE_APIKEY}}}/json/$1/$2?callback={{callback}}';
spice from => '(.+)\/(.+)';

triggers start => "translate";

handle query_lc => sub {
    my $query = $_;

    if($query =~ /^translate (\w+) from ($langs) to ($langs)$/) {
        my ($phrase, $from, $to) = ($1, $2, $3);

        $from = shorten_lang($from);
        $to   = shorten_lang($to);

        my $dict = $from.$to;

        return ($dict, $phrase);
    }

    return;
};

1;