#!/usr/bin/env python3
"""
LFUCache module
"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache class inherits from BaseCaching and implements a caching system
    using the Least Frequently Used (LFU) algorithm.
    """

    def __init__(self):
        """
        Initialize the LFUCache.
        """
        super().__init__()
        self.frequency = {}

    def put(self, key, item):
        """
        Add an item to the cache.

        If key or item is None, this method does nothing.
        If the number of items in self.cache_data > than BaseCaching.MAX_ITEMS
            Discard the least frequency used item (LFU algorithm).
            If more than one item has the same least frequency,
            use the LRU algorithm to discard only the least recently
            used among them.
            Print DISCARD: with the key discarded and a new line.
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                m_frq = min(self.frequency.values())
                lf_key = [k for k, v in self.frequency.items() if v == m_frq]

                if len(lf_key) > 1:
                    lru_key = min(lf_key, key=lambda k: self.frequency[k])
                    lf_key = [lru_key]

                discarded_key = lf_key[0]
                print("DISCARD:", discarded_key)
                del self.cache_data[discarded_key]
                del self.frequency[discarded_key]

            self.cache_data[key] = item
            self.frequency[key] = self.frequency.get(key, 0) + 1

    def get(self, key):
        """
        Get an item from the cache by key.

        If key is None or if the key doesn’t exist in self.cache_data,
        return None.
        Update the frequency to reflect the most recently used item.
        """
        if key in self.cache_data:
            self.frequency[key] = self.frequency.get(key, 0) + 1
            return self.cache_data[key]
        else:
            return None
